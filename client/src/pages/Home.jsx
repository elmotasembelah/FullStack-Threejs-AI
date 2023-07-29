import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store/index";

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from "../config/motion";

import { CustomButton } from "../components";

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {/* this snap.intro check can be put in the app file to show home if only needed */}
            {snap.intro && (
                <motion.section className="home" {...slideAnimation("left")}>
                    {/* logo */}
                    <motion.header {...slideAnimation("down")}>
                        <img
                            src="./threejs.png"
                            alt="logo"
                            className="w-10 h-10 object-contain"
                        />
                    </motion.header>

                    {/* head, content, button  */}
                    <motion.div
                        className="home-content"
                        {...headContainerAnimation}
                    >
                        {/* ! head text */}
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                LET&apos;S <br className="hidden xl:block " />{" "}
                                DO IT.
                            </h1>
                        </motion.div>
                        {/* content text */}
                        <motion.div
                            className="flex flex-col gap-5"
                            {...headContentAnimation}
                        >
                            <p className="max-w-md font-normal text-gray-600 text-base">
                                Create your unique and exclusive shirt with our
                                brand-new 3D customization tool.{" "}
                                <strong>Unleash your imagination</strong> and
                                define your own style.
                            </p>
                            {/* button */}
                            <CustomButton
                                type="filled"
                                title="customize it"
                                handleClick={() => (state.intro = false)}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            ></CustomButton>
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
