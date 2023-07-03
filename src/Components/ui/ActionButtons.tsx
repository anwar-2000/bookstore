import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const ActionButtons = () => {
  const router = useRouter();

  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center gap-4 w-56">
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        
        <Button variant="outlined" className="" onClick={() => router.push("/dashboard/dons")}>
            Dons
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        
        <Button variant="outlined" className="" onClick={() => router.push("/dashboard")}>
            Livres
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className=" font-light" onClick={() => router.push("/dashboard/retours")}>
            Retours
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className="" onClick={() => router.push("/dashboard/users")}>
            Modérateurs
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className="" onClick={() => router.push("/dashboard/vetements")}>
            Vetements
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className="" onClick={() => router.push("/dashboard/materiaux")}>
            Matériaux
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className="" onClick={() => router.push("/dashboard/clients")}>
           Payments
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outlined"  className="" onClick={() => signOut({ callbackUrl: "/users/login" })}>
          Déconnecter
        </Button>
      </motion.div>
    </div>
  );
};

export default ActionButtons;
