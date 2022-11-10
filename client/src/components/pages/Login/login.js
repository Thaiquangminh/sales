import {
    Box,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    Paper,
    Typography,
    Button,
    InputAdornment,
    FormHelperText,
    IconButton,
} from "@mui/material";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Tippy from "@tippyjs/react/headless";
import styles from "./login.module.scss";
function Login() {
    const { t } = useTranslation();
    const languages = [
        {
            code: "en",
            name: "english",
        },
        {
            code: "vi",
            name: "vietnam",
        },
    ];

    const [backendData, setBackendData] = useState([])
    useEffect(() => {
        fetch("/api")
            .then(res => res.json())     
            .then((data) => {                
                setBackendData(data)
            })
    }, [])

    // console.log(backendData);
    
    const errors = {
        uname: `${t("login_invalid_name")}`,
        pass: `${t("login_invalid_password")}`,
    };

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const renderError = (name) => {
        if (name === errorMessages.name) { 
            return (
                <FormHelperText sx={{ marginBottom: "30px" }} error>
                    {errorMessages.message}
                </FormHelperText>
            );
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleChangePass = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataUser = backendData.find((user) => {
            return name === user.username;
        });

        if (!!dataUser === true) {
            if (dataUser.password !== pass) {
                setErrorMessages({
                    name: "errorPassWord",
                    message: errors.pass,
                });
            } else if (dataUser.password === pass) {
                setIsSubmitted(true);
            }
        } else if (dataUser === undefined) {
            setErrorMessages({ name: "errorUname", message: errors.uname });
        }
    };

    const renderLogin = (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid>
                <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={styles.box} tabIndex="-1" {...attrs}>
                            <div
                                className={styles.tippyLanguage}
                                onClick={() =>
                                    i18next.changeLanguage(languages[0].code)
                                }
                            >
                                English
                            </div>
                            <div
                                className={styles.tippyLanguage}
                                onClick={() =>
                                    i18next.changeLanguage(languages[1].code)
                                }
                            >
                                Vietnamese
                            </div>
                        </div>
                    )}
                >
                    <IconButton
                        sx={{
                            float: "right",
                            marginRight: "80px",
                        }}
                    >
                        <LanguageOutlinedIcon></LanguageOutlinedIcon>
                    </IconButton>
                </Tippy>
            </Grid>

            <Grid
                container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Grid item md={4} sx={{ margin: "0 auto" }}>
                    <form onSubmit={handleSubmit} name="form_login">
                        <Paper elevation={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    mb={5}
                                    mt={5}
                                    sx={{ fontWeight: 600 }}
                                >
                                    {t("login_message")}
                                </Typography>
                                <FormGroup>
                                    <InputLabel sx={{ marginBottom: "10px" }}>
                                        {t("login_username")}
                                    </InputLabel>
                                    <Input
                                        onChange={handleChange}
                                        name="uname"
                                        sx={{ marginBottom: "30px" }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                    ></Input>
                                    {renderError("errorUname")}
                                </FormGroup>
                                <FormGroup>
                                    <InputLabel sx={{ marginBottom: "10px" }}>
                                        {t("login_password")}
                                    </InputLabel>
                                    <Input
                                        onChange={handleChangePass}
                                        name="pass"
                                        sx={{ marginBottom: "30px" }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon></LockOutlinedIcon>
                                            </InputAdornment>
                                        }
                                    ></Input>

                                    {renderError("errorPassWord")}
                                </FormGroup>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ marginBottom: "30px", width: "50%" }}
                                >
                                    {t("login_button")}
                                </Button>
                            </Box>
                        </Paper>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );

    //

    if (isSubmitted === true) {
        return <Navigate to="/dashboard" />;
    } else if (isSubmitted === false) {
        return renderLogin;
    }
}

export default Login;
