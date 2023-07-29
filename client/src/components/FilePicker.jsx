/* eslint-disable react/prop-types */
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
    return (
        <div className="filepicker-container">
            <div className="flex-1 flex flex-col">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="file-upload" className="filepicker-label">
                    Upload File
                </label>
                <p className="mt-3 truncate">
                    {file === "" ? "No file selected" : file.name}
                </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => readFile("logo")}
                ></CustomButton>
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => {
                        readFile("full");
                    }}
                ></CustomButton>
            </div>
        </div>
    );
};

export default FilePicker;
