import TagManager from "react-gtm-module";

export function sendGTMEvent(page: string, event: string) {
  if (process.env.NODE_ENV === "production") {
    TagManager.dataLayer({
      dataLayer: {
        page,
        event,
      },
    });
  }
}
