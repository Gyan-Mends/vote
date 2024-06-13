import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes"

const Home = () => {
    //theme
    const {theme, setTheme} = useTheme();

    return (
<div className={` h-screen transition duration-500 `}>
<Button
            onPress={() => {
                setTheme(
                    theme === "dark" ? "light" : "dark"
                )
            }}
            >
                {
                    theme ==="dark"  ? "dark" : "Light"
                }
            </Button>
            <p className="dark:text-primary-dark">This is Gyan</p>
        </div>
    )
}

export default Home