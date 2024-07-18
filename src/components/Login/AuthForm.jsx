import { useContext } from "react";
import { FunctionsContext } from "../Context";
import axios from "axios";

import styles from "./Styles.module.scss";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { forwardRef, useState, useRef, useImperativeHandle } from "react";

const AuthForm = forwardRef(({}, ref) => {
  const facebookUrl = "https://app.having.market/auth/facebook/redirect";
  const googleUrl = "https://app.having.market/auth/google/redirect";

  const navigate = useNavigate();
  const mainURL = "https://app.having.market/api/";
  const dialog = useRef();
  const [panel, setPanel] = useState(false);
  const [formActivated, setFormActivated] = useState(false);
  const tokenChanger = useContext(FunctionsContext).changeToken;
  const addPhone = useContext(FunctionsContext).addPhone;

  const [verfied, setVerified] = useState(false);
  const [forgotPassWord, setForgotPassWord] = useState(false);

  const [loginError, setLoginError] = useState(null);

  function handleLogSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("https://app.having.market/api/login", data)
      .then((res) => {
        if (res.status === 200 && res.data.data !== "") {
          console.log("login res: ", res);
          const resToken = res.data.data.token;
          const phone = res.data.data.user.phone;
          if ("" === phone.trim()) {
            console.log("phone is empty");
            addPhone(resToken, false);
            LoginSuccessfully();
            navigate("/profile");
            // tokenChanger(resToken, true);
          } else {
            tokenChanger(resToken, true);
            LoginSuccessfully();
            navigate("/buy");
          }
        } else if (res.status === 200 && res.data.data === "") {
          alert(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        // setLoginError(error.response.data.message);
      })
      .finally(() => {
        // Reset the form inputs
        e.target.reset();
      });
  }
  // for registeration proccess
  function handleRegSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    };
    axios
      .post(mainURL + "register", data)
      .then((res) => {
        console.log(res);
        const resToken = res.data.data.token;
        tokenChanger(resToken, true);
        navigate("/buy");
        if (e.status === 200) {
          const resToken = e.data.data.token;
          console.log(e);
          tokenChanger(resToken, true);
        }
        setVerified("in progress");
        function checkVerify() {
          axios(mainURL + "user", {
            headers: {
              // 'Accept': 'application/vnd.api+json',
              // 'Content-Type': 'application/vnd.api+json',
              Authorization: `Bearer ${res.data.data.token}`,
            },
          }).then((e) => {
            // console.log(e);

            if (e.data.email_verified_at !== null) {
              clearInterval(interval);
              setVerified(true);
              navigate("/buy");
              LoginSuccessfully();
            }
          });
        }
        const interval = setInterval(checkVerify, 2000);
      })
      .catch((err) => {
        alert("there is somthing wrong in data you entered..");
        // console.log(err)
      });
    const vpanel = dialog.current.querySelector("div.panel");
    console.log("reg: ", vpanel);
  }

  // for oppeining and closing the dialog

  function handelSignInPanel() {
    setPanel((prev) => {
      return !prev;
    });
  }

  function handelChangeForm(e) {
    e.preventDefault();
    setFormActivated((prev) => {
      return !prev;
    });
    console.log(formActivated);
  }

  function LoginSuccessfully() {
    dialog.current.close();
  }
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });
  function handleClose() {
    dialog.current.close();
  }

  function handleForgotPassWord(e) {
    e.preventDefault(e);
    setForgotPassWord((prev) => {
      return !prev;
    });
  }
  function handleForgotPassWordSubmit(e) {
    e.preventDefault();
    const emailData = new FormData(e.target);
    const passwordData = {
      email: emailData.get("email"),
    };
    axios
      .post("https://app.having.market/api/forgot-password", passwordData, {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("go to check your mail box");
          setForgotPassWord((prev) => {
            return !prev;
          });
        }
      })
      .catch((err) => console.log(err));
  }
  return createPortal(
    <dialog
      ref={dialog}
      className={`${styles.container} ${panel && styles.rightPanelActive}`}
      id="container"
    >
      <div className={`${styles.formContainer}  ${styles.signUpContainer}`}>
        <form onSubmit={handleRegSubmit}>
          <i
            className={`fa-solid fa-xmark ${styles.close}`}
            onClick={handleClose}
          ></i>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href={facebookUrl} className="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href={googleUrl} className="">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            required
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="off"
          />
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          <input
            required
            type="number"
            placeholder="phone"
            name="phone"
            autoComplete="off"
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
          />
          <input
            required
            type="password"
            placeholder="confirm password"
            name="password_confirmation"
            autoComplete="off"
          />
          {/* <button className={styles.signUpButton}>Sigsn Up</button> */}

          <div className={styles.signBtns}>
            <button>Sign Up</button>
            <button className={styles.mobileBtn} onClick={handelChangeForm}>
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div
        className={`${styles.formContainer} ${
          formActivated && styles.mobileLeft
        } ${styles.signInContainer}`}
      >
        {forgotPassWord ? (
          <form onSubmit={handleForgotPassWordSubmit}>
            <i
              className={`fa-solid fa-arrow-left ${styles.close}`}
              onClick={handleForgotPassWord}
            ></i>
            <h1>Forgot Password!</h1>
            <input
              required
              type="email"
              placeholder="type your email"
              name="email"
              autoComplete="email"
            />
            <div className={styles.forgetRow}>
              <button>Send</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogSubmit}>
            <i
              className={`fa-solid fa-xmark ${styles.close}`}
              onClick={handleClose}
            ></i>
            <h1>Sign in</h1>
            <div className={styles.socialContainer}>
              <a href={facebookUrl} className="">
                <i
                  className="fab fa-facebook-f"
                  onClick={() => (window.location.href = facebookUrl)}
                ></i>
              </a>
              <a href={googleUrl} className="">
                <i
                  className="fab fa-google-plus-g"
                  onClick={() => (window.location.href = googleUrl)}
                ></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
            />
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
            {loginError && (
              <span className={styles.errorMessage}>{loginError}</span>
            )}
            <div className={styles.signBtns}>
              <button>Sign In</button>
              <button className={styles.mobileBtn} onClick={handelChangeForm}>
                sign up
              </button>
            </div>
            <button
              onClick={handleForgotPassWord}
              className={styles.forgetPassword}
            >
              Forgot your password?
            </button>
          </form>
        )}
      </div>
      <div
        className={
          styles.overlayContainer +
          " panel " +
          `${
            verfied === "in progress" || verfied === true
              ? styles.verification
              : ""
          }`
        }
      >
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            {verfied === "in progress" ? (
              <>
                <dotlottie-player
                  src="https://lottie.host/1cdf1cf5-8a69-4b48-9ce9-21fd8ec03cbb/HetkZGBD4S.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "300px", height: "300px" }}
                  loop
                  autoplay
                ></dotlottie-player>
                <h3>Waiting for account verification</h3>
                <p>please check your mail</p>
              </>
            ) : verfied === true ? (
              <>
                <h3>Verfied Successfully</h3>
              </>
            ) : (
              <>
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={styles.buttonGhost}
                  id="signIn"
                  onClick={handelSignInPanel}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className={styles.buttonGhost}
              id="signUp"
              onClick={handelSignInPanel}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root"),
  );
});

export default AuthForm;
