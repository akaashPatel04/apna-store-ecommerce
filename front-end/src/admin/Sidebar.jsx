import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  BiCartAdd,
  BiSolidDashboard,
  BiListCheck,
  BiNote,
} from "react-icons/bi";
import "../styles/admin/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p className="text">
          <BiSolidDashboard fontSize={"25px"} /> Dashboard
        </p>
      </Link>
      <div>
        <Menu>
          <MenuButton id="productText" className="text">
            Products
          </MenuButton>
          <MenuList nodeid="1" label="Products">
            <Link to="/admin/product/create">
              <MenuItem
                id="menuItem"
                color={"#888"}
                fontSize={"25px"}
                label="New Product"
                icon={<BiCartAdd fontSize={"25px"} />}
                nodeid="1"
              >
                New Product
              </MenuItem>
            </Link>
            <Link to="/admin/products">
              <MenuItem
                id="menuItem"
                color={"#888"}
                fontSize={"25px"}
                label="Create"
                icon={<BiListCheck fontSize={"25px"} />}
                nodeid="2"
              >
                All Products
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </div>
      <Link to="/admin/orders">
        <p className="text">
          <BiListCheck fontSize={"32px"} />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p className="text">
          <AiOutlineUsergroupAdd fontSize={"25px"} /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p className="text">
          <BiNote fontSize={"25px"} />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
