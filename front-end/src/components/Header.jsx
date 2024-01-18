import { Link, useNavigate } from "react-router-dom";
import {
  BiMenuAltRight,
  BiCart,
  BiShoppingBag,
  BiSolidDashboard,
  BiSolidContact,
} from "react-icons/bi";
import { FaHome, FaUser } from "react-icons/fa";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { resetCart, resetShippingInfo } from "../redux/cartSlice";
import { removeAllData } from "../redux/adminSlice";
import { toast } from "react-toastify";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItem } = useSelector((state) => state.cart);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    dispatch(resetCart());
    dispatch(resetShippingInfo());
    dispatch(removeAllData());
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <>
      <Box
        position={"fixed"}
        top={"5"}
        right={"5"}
        zIndex={"98"}
        w={"5vmax"}
        h={"5vmax"}
        color={"gray"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <BiMenuAltRight fontSize={"3vmax"} onClick={onOpen} />
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign={"start"} px={"2vmax"} color={"#eb4034"}>
            APNA STORE{" "}
            <DrawerCloseButton
              size={"2vmax"}
              right={["6vmax", "4vmax"]}
              top={["2.5vmax", "2vmax", "1.5vmax"]}
              fontWeight="900"
            />
          </DrawerHeader>
          <DrawerBody>
            <VStack pt={"2vmax"} alignItems={"flex-start"}>
              {user && user.role === "admin" && (
                <Link to={"/admin/dashboard"}>
                  <Button
                    color={"blue"}
                    fontSize={["2.5vmax", "2vmax", "1.5vmax"]}
                    onClick={onClose}
                    variant={"ghost"}
                    textAlign={"left"}
                  >
                    <BiSolidDashboard style={{ marginRight: "1vmax" }} />
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              {user && (
                <Link to={"/profile"}>
                  <Button
                    color={"blue"}
                    fontSize={["2.5vmax", "2vmax", "1.5vmax"]}
                    onClick={onClose}
                    variant={"ghost"}
                    textAlign={"left"}
                  >
                    <FaUser style={{ marginRight: "1vmax" }} />
                    <span>Profile</span>
                  </Button>
                </Link>
              )}
              <Link to={"/search"}>
                <Button
                  color={"blue"}
                  onClick={onClose}
                  variant={"ghost"}
                  fontSize={["2.5vmax", "2vmax", "1.5vmax"]}
                >
                  <BiShoppingBag style={{ marginRight: "1vmax" }} />
                  <span>Products</span>
                </Button>
              </Link>
              <Link to={"/cart"}>
                <Button
                  color={"blue"}
                  onClick={onClose}
                  variant={"ghost"}
                  fontSize={["2.5vmax", "2vmax", "1.5vmax"]}
                >
                  <BiCart style={{ marginRight: "1vmax" }} />
                  <span>
                    Cart
                    {cartItem && cartItem.length > 0 && (
                      <Text
                        position={"absolute"}
                        top={"-1"}
                        right={"-5"}
                        fontSize={["2vmax", "1.25vmax"]}
                        border={"2px"}
                        borderRadius={"50%"}
                        h={["3.25vmax", "2vmax"]}
                        w={["3.25vmax", "2vmax"]}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        {cartItem.length}
                      </Text>
                    )}
                  </span>
                </Button>
              </Link>
              <Link to={"/about"}>
                <Button
                  color={"blue"}
                  onClick={onClose}
                  variant={"ghost"}
                  fontSize={["2.5vmax", "2vmax", "1.5vmax"]}
                >
                  <BiSolidContact style={{ marginRight: "1vmax" }} />
                  <span>About</span>
                </Button>
              </Link>
            </VStack>
            <HStack
              position={"absolute"}
              bottom={"2vmax"}
              left={"0"}
              justifyContent={"center"}
              w={"100%"}
            >
              {!user ? (
                <>
                  <Link onClick={onClose} to={"/login"}>
                    <Button onClick={onClose} mr={"2vmax"} colorScheme="red">
                      Login
                    </Button>
                  </Link>
                  <Link onClick={onClose} to={"/register"}>
                    <Button
                      onClick={onClose}
                      variant={"outline"}
                      colorScheme="red"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <span onClick={onClose}>
                  <Button onClick={handleLogout} colorScheme="red">
                    Logout
                  </Button>
                </span>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const HomeIcon = () => {
  const navigate = useNavigate();

  return (
    <Box
      position={"fixed"}
      top={"5"}
      left={"5"}
      zIndex={"98"}
      w={"5vmax"}
      h={"5vmax"}
      color={"gray"}
      onClick={() => navigate("/")}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FaHome fontSize={"3vmax"} />
    </Box>
  );
};
