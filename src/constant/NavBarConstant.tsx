import {
  CameraIcon,
  Coins,
  HomeIcon,
  ListOrdered,
  Package,
  PackageIcon,
  Settings,
  User2,
  UsersIcon,
} from "lucide-react";
// import { HomeIcon, LineChartIcon, PackageIcon, UsersIcon } from "lucide-react";

export const AdminNavList = [
  {
    id: 1,
    item: "Home",
    link: "/admin",
    icon: <HomeIcon />,
    subList: [],
  },
  {
    id: 2,
    item: "Category",
    link: "/admin/category",
    icon: <PackageIcon />,
    subList: [],
  },
  {
    id: 3,
    item: "Billboard",
    link: "/admin/billboard",
    icon: <CameraIcon />,
    subList: [],
  },
  {
    id: 4,
    item: "Users",
    link: "/admin/users",
    icon: <UsersIcon />,
    subList: [],
  },
  {
    id: 5,
    item: "Settings",
    link: "/admin/settings",
    icon: <Settings />,
    subList: [],
  },
  {
    id: 6,
    item: "Vendor",
    link: "/vendor",
    icon: <User2 />,
    subList: [],
  },
];

export const VendorNavList = [
  {
    id: 1,
    item: "Home",
    link: "/vendor",
    icon: <HomeIcon />,
    subList: [],
  },
  {
    id: 2,
    item: "Product",
    link: "/vendor/product",
    icon: <Package />,
    subList: [
      {
        id: 1,
        item: "/create",
        link: "/vendor/product/create",
      },
      {
        id: 2,
        item: "/list",
        link: "/vendor/product/list",
      },
    ],
  },
  {
    id: 3,
    item: "Order",
    link: "/vendor/order",
    icon: <ListOrdered />,
    subList: [],
  },
  {
    id: 4,
    item: "Invoice",
    link: "/vendor/invoice",
    icon: <Coins />,
    subList: [],
  },
];
