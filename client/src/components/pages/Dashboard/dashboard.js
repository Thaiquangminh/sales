import {
    AppBar,
    Box,
    MenuItem,
    Grid,
    IconButton,
    Menu,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <Box onClick={handleClose}>
            <AppBar>
                <Grid container>
                    <IconButton onClick={handleOpenMenu}>
                        <MenuIcon sx={{ color: "#fff" }}></MenuIcon>
                    </IconButton>
                    <Menu open={isOpen}>
                        <Button>
                            <MenuItem>
                                <KeyboardArrowDownIcon />
                                DASHBOARD
                            </MenuItem>
                        </Button>
                        <Button>
                            <MenuItem>
                                <KeyboardArrowDownIcon />
                                CATALOG
                            </MenuItem>
                        </Button>
                    </Menu>
                </Grid>
            </AppBar>
        </Box>
    );
}

export default Dashboard;
