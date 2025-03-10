"use client";

import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./sidebar";
import TopBar from "./topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true); // State to control sidebar open/close

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar open={open} setOpen={setOpen} /> {/* Top Bar */}
      <Sidebar open={open} setOpen={setOpen} /> {/* Sidebar */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: open ? "0px" : "40px", mt: "64px" }}>
        {children}
      </Box>
    </Box>
  );
}
