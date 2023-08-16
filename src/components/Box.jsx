import { useState } from "react";
import { ShowHideButton } from "./ShowHideButton";

export function Box({ children }) {

    const [isOpen, setIsOpen] = useState(true);


    return (
        <>
            <div className="box">

                <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />

                {
                    isOpen
                    &&
                    children
                }
            </div>
        </>
    )
}