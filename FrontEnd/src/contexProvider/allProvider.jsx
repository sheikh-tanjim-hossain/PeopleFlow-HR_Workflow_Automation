import UserProvider from "./userProvider";

export default function AllProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
