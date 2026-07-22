/**
 * /connect/terms — legacy URL kept for old links (Greyfinch embed, signup
 * emails). The canonical Terms of Service now lives at /terms.
 */

import { redirect } from "next/navigation";

export default function ConnectTermsRedirect() {
  redirect("/terms");
}
