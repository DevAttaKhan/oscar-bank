import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e.message) {
      return e.message;
    }

    // Return generic message
    return "Oh no, something went wrong!";
  },
});
