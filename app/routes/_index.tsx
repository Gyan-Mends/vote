import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import LoaderIcon from "~/components/icons/LoaderIcon";
import logo from "~/components/illustration/logo.png"

const Home = () => {
    // theme
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer); // cleanup the timer
    }, []);

    return (
        <div className={`h-screen transition duration-500`}>
            {loading ? (
                <>
                    <div className="h-[100vh] bg-slate-950 w-full flex flex-col items-center justify-center">
                        <img className="-mt-40" src={logo} alt="" />
                        <p className="font-poppins text-8xl">VoteEase</p>
                        <LoaderIcon className="h-40 w-40 mt-10"/>
                    </div>
                </>
            ) : (
                <>
                    <Button
                        onPress={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "dark" ? "Dark" : "Light"}
                    </Button>
                    <p className="dark:text-primary-dark">This is Gyan</p>
                </>
            )}
        </div>
    );
};

export default Home;
