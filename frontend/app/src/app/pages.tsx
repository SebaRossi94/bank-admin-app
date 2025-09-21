import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";

export type Page = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const usePages = (
  { enableHome }: { enableHome: boolean } = { enableHome: true }
): Page[] => {
  return [
    ...(enableHome
      ? [
          {
            href: "/",
            title: "Home",
            description: "Home",
            icon: <HomeIcon />,
          },
        ]
      : []),
    {
      href: "/customers",
      title: "Customers",
      description: "Manage Customers",
      icon: <PersonIcon />,
    },
    {
      href: "/accounts",
      title: "Accounts",
      description: "Manage Accounts",
      icon: <AccountBalanceIcon />,
    },
    {
      href: "/transferences",
      title: "Transferences",
      description: "Manage Transferences",
      icon: <MoneyIcon />,
    },
  ];
};
