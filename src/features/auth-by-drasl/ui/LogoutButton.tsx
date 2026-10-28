import { Button } from "@/shared/ui";
import { logoutAction } from "../api/logout";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="ghost">
        Выйти
      </Button>
    </form>
  );
}
