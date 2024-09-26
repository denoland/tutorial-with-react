import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dino } from "../../types";

export default function Dinosaur() {
    const { selectedDinosaur } = useParams();
    const [dinosaur, setDino] = useState<Dino>({ name: "", description: "" });

    useEffect(() => {
        (async () => {
            const resp = await fetch(
                `http://localhost:8000/dinosaurs/${selectedDinosaur}`,
            );
            const dino = await resp.json() as Dino;
            setDino(dino);
        })();
    }, []);

    return (
        <div>
            <h1>{dinosaur.name}</h1>
            <p>{dinosaur.description}</p>
            <Link to="/">🠠 Back to all dinosaurs</Link>
        </div>
    );
}
