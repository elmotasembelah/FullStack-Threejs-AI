/* eslint-disable react/prop-types */
import CustomButton from "./CustomButton";

const AiPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className="aipicker-container">
            <textarea
                className="aipicker-textarea"
                placeholder="Ask AI..."
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomButton type="outline" title="Asking Ai..." />
                ) : (
                    <>
                        <CustomButton
                            type="outline"
                            title="AI Logo"
                            handleClick={() => handleSubmit("logo")}
                        />
                        <CustomButton
                            type="filled"
                            title="AI Full"
                            handleClick={() => handleSubmit("full")}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AiPicker;
