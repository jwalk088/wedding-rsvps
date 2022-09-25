class GraphqlController < ApplicationController
  # TODO - add new queries and mutataions here
  ANANYMOUS_OPERATIONS=Set.new([:is_signed_in, :sign_in, :sign_out])
  GUEST_OPERATIONS=Set.new([:menus, :ages, :groups, :find_guest_by_name, :events, :event, :rsvps, :invitations, :add_menu, :add_guest, :update_guest, :destroy_guest, :add_rsvp, :add_rsvp_bulk, :update_rsvp, :add_invitation, :add_plus_one, :guests_by_event, :add_comment, :update_email_bulk])
  ADMIN_OPERATIONS=Set.new([:guests, :menus, :ages, :groups, :find_guest_by_name, :events, :event, :rsvps, :invitations, :add_menu, :add_guest, :update_guest, :destroy_guest, :add_rsvp, :add_rsvp_bulk, :update_rsvp, :add_invitation, :add_plus_one, :guests_by_event, :add_comment, :update_email_bulk, :comments, :totals])

  protect_from_forgery with: :exception
   before_action :variables_from_params, only: [:execute]

  def execute
    authenticate_user!(@operations, @session, @headers['Authorization'])
    context = { session: session }
    
    result = WeddingwebsiteSchema.execute(@query, variables: @variables, context: context, operation_name: @operation_name)
    render json: result



    # variables = prepare_variables(params[:variables])
    # query = params[:query]
    # operation_name = params[:operationName]
    # context = {
    #   # Query context goes here, for example:
    #   # current_user: current_user,
    # }
    # result = WeddingwebsiteSchema.execute(query, variables: variables, context: context, operation_name: operation_name)





  rescue ::Exceptions::AuthenticationError => e
    render json: { errors: [{ message: 'Must be signed in' }], data: {} }, status: 403
  rescue ::Exceptions::AuthorizationError => e
    render json: { errors: [{ message: 'Must be admin' }], data: {} }, status: 401
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  def variables_from_params
    @variables = prepare_variables(params[:variables])
    @query = params[:query]
    @operation_name = params[:operationName]
    @operations = GraphQL::Query.new(WeddingwebsiteSchema, @query, operation_name: @operation_name).lookahead.selections.map(&:name)
    @session = session
    @headers = request.headers
  end

  def authenticate_user!(operations, session, graphiql_header)
    return if graphiql_header == 'Token Graphiql' && Rails.env.development?
    return if Set.new(operations).subset?(ANANYMOUS_OPERATIONS)
    sign_in = session[:sign_in]&.to_sym
    raise ::Exceptions::AuthenticationError if sign_in.nil?
    return if Set.new(operations).subset?(Set.new(ADMIN_OPERATIONS)) and sign_in == :admin
    return if Set.new(operations).subset?(Set.new(GUEST_OPERATIONS)) and sign_in == :guest
    raise ::Exceptions::AuthorizationError
  end
end
