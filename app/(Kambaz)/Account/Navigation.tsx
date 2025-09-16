import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link href="/Account/Signin" id="wd-signin-navigation-link"> Signin </Link> <br />
      <Link href="/Account/Signup" id="wd-signup-navigation-link"> Signup </Link> <br />
      <Link href="/Account/Profile" id="wd-profile-navigation-link"> Profile </Link> <br />
    </div>
  );
}
