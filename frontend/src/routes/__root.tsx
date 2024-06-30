import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Navbar() {
  return (
    <div className="flex gap-2 justify-center bg-primary-foreground p-2">
      <Link
        to="/"
        className="[&.active]:underline [&.active]:underline-offset-4 hover:text-primary/50 [&.active]:hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/expenses"
        className="[&.active]:underline [&.active]:underline-offset-4 hover:text-primary/50 [&.active]:hover:text-primary"
      >
        Expenses
      </Link>
      <Link
        to="/create-expense"
        className="[&.active]:underline [&.active]:underline-offset-4 hover:text-primary/50 [&.active]:hover:text-primary"
      >
        Create
      </Link>
      <Link
        to="/about"
        className="[&.active]:underline [&.active]:underline-offset-4 hover:text-primary/50 [&.active]:hover:text-primary"
      >
        About
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
