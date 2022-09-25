import React from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";

export default function CommentsTable({ comments }) {
  function getCommentRow(comment) {
    const dateFormatted = moment(comment.createdAt).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    return (
      <Table.Row key={comment.id}>
        <Table.Cell>{dateFormatted}</Table.Cell>
        <Table.Cell>
          {comment.guest.firstName} {comment.guest.lastName}
        </Table.Cell>
        <Table.Cell>{comment.message}</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Guest</Table.HeaderCell>
          <Table.HeaderCell>Message</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{comments?.map(getCommentRow)}</Table.Body>
    </Table>
  );
}
