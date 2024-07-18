import { createContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export const DataContext = createContext();
export const FunctionsContext = createContext();

export function TokenProvider({ children }) {
  const [loginState, setLoginState] = useState({
    login: false,
    token: null,
    phone: false,
  });
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("loginState"))?.login ||
      JSON.parse(localStorage.getItem("loginState"))?.phone
    ) {
      setLoginState(() => JSON.parse(localStorage.getItem("loginState")));
    }
  }, []);

  // useEffect(() => {
  //   const savedLoginState = JSON.parse(localStorage.getItem("loginState"));
  //   if (savedLoginState?.login) {
  //     setLoginState((prevState) => ({
  //       ...prevState,
  //       login: savedLoginState.login,
  //       token: savedLoginState.token,
  //     }));
  //   }
  // }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("Ar");

  // function changeToken(e, state) {
  //   console.log("token changer");
  //   localStorage.setItem(
  //     "loginState",
  //     JSON.stringify({
  //       login: state,
  //       token: e,
  //     }),
  //   );

  //   setLoginState(() => JSON.parse(localStorage.getItem("loginState")));

  //   console.log("local: ", JSON.parse(localStorage.getItem("loginState")));
  // }

  function changeToken(e, state) {
    console.log("token changer");
    const updatedLoginState = {
      login: state,
      token: e,
      phone: loginState.phone, // Preserve the current phone state
    };
    localStorage.setItem("loginState", JSON.stringify(updatedLoginState));
    setLoginState(updatedLoginState);
    console.log("local: ", updatedLoginState);
  }

  function changeLang(lang) {
    setLang(lang);
  }
  function changeDarkMode(isDark) {
    setDarkMode(isDark);
  }
  function addPhone(token, state) {
    console.log("change phone: ", token);
    const updatedLoginState = {
      login: true,
      token: token,
      phone: state, // Preserve the current phone state
    };
    localStorage.setItem("loginState", JSON.stringify(updatedLoginState));
    setLoginState(updatedLoginState);
  }
  // console.log("log state: ", loginState);

  return (
    <DataContext.Provider value={{ loginState, darkMode, lang }}>
      <FunctionsContext.Provider
        value={{ addPhone, changeToken, changeLang, changeDarkMode }}
      >
        {children}
      </FunctionsContext.Provider>
    </DataContext.Provider>
  );
}
