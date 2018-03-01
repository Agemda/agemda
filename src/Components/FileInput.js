import React from "react";

const FileInput = ({
  name,
  label,
  fileName,
  fileLabel,
  className,
  onChange
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className={"file has-name " + className}>
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name={name}
              onChange={onChange}
              accept="image/*"
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload" />
              </span>
              <span className="file-label">{fileLabel}</span>
            </span>
            <span className="file-name">{fileName}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileInput;

// const ImagePreview = styled.img`
//   display: none;
//   max-width: 200px;
//   max-height: 400px;
//   cursor: pointer;
// `;

// const FileInput = ({ onChange, image, fileName }) => {
//   return (
//     <div>
//       <div className="field">
//         <div className="file has-name">
//           <label className="file-label">
//             <input
//               className="file-input"
//               type="file"
//               name="file"
//               onChange={onChange}
//             />
//             <span className="file-cta">
//               <span className="file-icon">
//                 <i className="fa fa-upload" />
//               </span>
//               <span className="file-label">Choisir une image</span>
//             </span>
//             <span className="file-name">
//               {fileName || "Aucune image n'a été choisi."}
//             </span>
//           </label>
//         </div>
//       </div>
//       <ImagePreview
//         src={image}
//         alt="preview"
//         id="imagePreview"
//         onClick={e => {
//           document
//             .getElementById("imagePreviewModal")
//             .classList.add("is-active");
//         }}
//       />
//       <div className="modal" id="imagePreviewModal">
//         <div className="modal-background" />
//         <div className="modal-content">
//           <p className="image is-4by3">
//             <img src={image} alt="imagePreviewModal" />
//           </p>
//         </div>
//         <button
//           className="modal-close is-large"
//           aria-label="close"
//           onClick={e => {
//             e.preventDefault();
//             document
//               .getElementById("imagePreviewModal")
//               .classList.remove("is-active");
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default FileInput;
