"use client";

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Toolbar } from "@mui/material";
import { Dashboard, ManageAccounts, AccountBalance, Assessment, Engineering, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

const NAV_ITEMS = [
  { title: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { title: "Manage Accounts", icon: <ManageAccounts />, path: "/admin/accounts" },
  { title: "Memberships", icon: <AccountBalance />, path: "/admin/memberships" },
  { title: "Reports", icon: <Assessment />, path: "/admin/reports" },
  { title: "Team Members", icon: <Engineering />, path: "/admin/createAccount" }, 
];

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: open ? 240 : 60, transition: "width 0.3s" },
      }}
    >
      <Toolbar>
        <IconButton onClick={() => setOpen(!open)}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
      </Toolbar>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.title} sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
