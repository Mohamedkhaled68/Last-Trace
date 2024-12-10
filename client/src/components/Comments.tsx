import { useState } from "react";
import { iconic, shareIcon } from "../assets";

interface Comment {
    id: number;
    username: string;
    image: string;
    comment: string;
}

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [input, setInput] = useState<string>("");

    const handleinputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newComment = e.target.value;
        setInput(newComment);
    };

    const handleSubmitComment = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setComments((prevComments) => [
            ...prevComments,
            {
                id: Date.now(),
                username: "مريم العمريطي",
                image: iconic,
                comment: input,
            },
        ]);

        setInput("");
    };

    return (
        <>
            <form
                onSubmit={handleSubmitComment}
                className="flex items-start gap-[15px] w-full "
            >
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                        className="max-w-full object-cover"
                        src={iconic}
                        alt="iconic"
                    />
                </div>
                <div className="w-full p-[24px] flex flex-col gap-[16px] rounded-[8px] border border-grey-100 bg-white">
                    <textarea
                        onChange={handleinputChange}
                        placeholder="شارك برأيك حول القضية..."
                        className="resize-none placeholder:text-body-16-r outline-none placeholder:text-grey-400 text-grey-900 text-body-18-m bg-transparent border-b border-grey-50"
                        name="comment"
                        id="comment"
                        value={input}
                    />
                    <button
                        type="submit"
                        className="p-[15px] bg-grey-50 w-[56px] h-[56px] rounded-[8px] self-end flex justify-center items-center"
                    >
                        <img
                            className="object-cover w-full"
                            src={shareIcon}
                            alt="share"
                        />
                    </button>
                </div>
            </form>
            {/* Displaying the comments */}
            <div className="flex flex-col gap-[40px] mt-[40px]">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex items-stretch gap-[15px]"
                    >
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                                className="max-w-full object-cover"
                                src={comment.image}
                                alt={comment.username}
                            />
                        </div>
                        <div className="h-full flex flex-col gap-[8px]">
                            <p className="text-body-14-b">{comment.username}</p>

                            <p className="text-body-18-r text-grey-900">
                                {comment.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comments;
