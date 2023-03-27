import SideNav from "@/Components/ui/SideNav";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SET_OPEN } from "@/redux/reducers/Toggle";
import { useDispatch } from "react-redux";
import { Menu } from "lucide-react";

import { motion } from "framer-motion";

interface Props {}

const variants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -400, opacity: 1 }
};

const transition = { duration: 0.5, ease: "easeIn" };

const index = () => {
  const dispatch = useDispatch();
  const toggle = () => dispatch(SET_OPEN());
  const { isOpen } = useSelector((state: any) => state.toggle);

  return (
    <Container>
      
        <motion.div
          initial="open"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={transition}
        >
          <SideNav />
        </motion.div>
      
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
`;
