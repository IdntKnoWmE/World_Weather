import type {ReactNode} from "react";

type CardProps = {
    children: ReactNode;
    title: string;
    cardClassName?: string;
    childrenClassName?: string;
}
function Card({children, title, cardClassName, childrenClassName}: CardProps) {
    return (
        <div className={`w-full rounded-xl bg-linear-to-br from-card to-card/70 bg-red-500/60 backdrop-blur-2xl shadow-2xl flex flex-col gap-5 ${cardClassName}`}>
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className={`w-full flex-1 animate-[fade-in_1s_ease-out_forwards] ${childrenClassName}`}>{children}</div>
        </div>
    );
}

export default Card;