import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import "../app/styles/styles.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    email: [""],
    name: [""],
    subject: "",
    dynamicContent: {
      subjectHeading: "",
      introParagraph: "",
      firstImage: "",
      aboutHeading: "",
      aboutParagraph: "",
      secondImage: "",
      invitationHeading: "",
      invitationParagraph: "",
      detailsHeading: "",
      detailsList: [""],
      keyTopicsHeading: "",
      keyTopicsList: [""],
      keyTopicsImage: "",
      masterClassHeading: "",
      masterClassParagraph: "",
      weAreInHeading: "",
      weAreInParagraph: "",
      nominationHeading: "",
      nominationParagraph: "",
      otherCostsHeading: "",
      otherCostsList: [""],
      paymentInfoHeading: "",
      paymentInfoParagraph: "",
      paymentDetails: [
        {
          type: "",
          bankName: "",
          intermediaryBank: "",
          swiftCode: "",
          routingNumber: "",
          beneficiaryName: "",
          beneficiaryAccount: "",
        },
      ],
      thirdPartyPaymentInfo: "",
      distanceLearningInfo: "",
      endowmentInfo: "",
      enrolNowInfo: "",
      closingLine: "",
      signatureImage: "",
      signName: "",
      letterheadImage: "",
      footerText: "",
      footerImage: "",
      viewInBrowserLink: "",
      unsubscribeLink: "",
    },
  });

  const [status, setStatus] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  // Load form data from localStorage if it exists
  useEffect(() => {
    const savedFormData = localStorage.getItem("emailFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem("emailFormData", JSON.stringify(formData));
  }, [formData]);

  // Add a new field dynamically
  const addField = (type, key = null) => {
    setFormData((prev) => {
      if (key) {
        return {
          ...prev,
          dynamicContent: {
            ...prev.dynamicContent,
            [key]: [...prev.dynamicContent[key], type === "object" ? {} : ""],
          },
        };
      }
      return {
        ...prev,
        [type]: [...prev[type], ""],
      };
    });
  };

  // Remove a dynamic field
  const removeField = (type, index, key = null) => {
    setFormData((prev) => {
      if (key) {
        return {
          ...prev,
          dynamicContent: {
            ...prev.dynamicContent,
            [key]: prev.dynamicContent[key].filter((_, i) => i !== index),
          },
        };
      }
      return {
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      };
    });
  };

  // Handle form input changes
  const handleChange = (e, type, index = null, key = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      if (key) {
        setFormData((prev) => ({
          ...prev,
          dynamicContent: {
            ...prev.dynamicContent,
            [key]: prev.dynamicContent[key].map((item, i) =>
              i === index ? (typeof item === "object" ? { ...item, [name]: value } : value) : item
            ),
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [type]: prev[type].map((item, i) => (i === index ? value : item)),
        }));
      }
    } else {
      if (key) {
        setFormData((prev) => ({
          ...prev,
          dynamicContent: {
            ...prev.dynamicContent,
            [name]: value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [type]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: "info", message: "Sending email..." });

      // Show the popup
      setPopupVisible(true);

      // Simulate a delay before sending the email
      setTimeout(async () => {
        try {
          await axios.post("https://send-email-517z.onrender.com/send-invitation-email", formData);
          setStatus({ type: "success", message: "Email sent successfully!" });
          setTimeout(() => {
            setPopupVisible(false); // Hide popup after success
          }, 2000); // Popup disappears after 2 seconds
        } catch (error) {
          setStatus({ type: "error", message: "Failed to send email." });
        }
      }, 2000); // Simulate a 2-second preparation time before sending

    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to prepare email." });
    }
  };

  return (
    <section className="container">
      <div>
        <div className="sticky-images">
          <Image
            src="/images/header.JPG"
            alt="logo"
            width={500}
            height={250}
            layout="intrinsic"
            className="img-fluid"
          />
          <Image
            src="/images/header.JPG"
            alt="logo"
            width={500}
            height={250}
            layout="intrinsic"
            className="img-fluid"
          />
        </div>
        <hr></hr>
        
        <form onSubmit={handleSubmit}>
          {/* Email and Name Inputs */}
          {["email", "name"].map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}s:</label>
              {formData[field].map((item, index) => (
                <div key={index}>
                  <input
                    type={field === "email" ? "email" : "text"}
                    placeholder={`Enter ${field}`}
                    value={item}
                    onChange={(e) => handleChange(e, field, index)}
                    required
                  />
                  <button type="button" onClick={() => removeField(field, index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addField(field)}>
                Add {field.charAt(0).toUpperCase() + field.slice(1)}
              </button>
            </div>
          ))}

          {/* Subject */}
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e) => handleChange(e, "subject")}
              required
            />
          </div>

          {/* Dynamic Content */}
          {Object.entries(formData.dynamicContent).map(([key, value]) => (
            <div key={key}>
              <label>
                {key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}:
              </label>
              {Array.isArray(value) ? (
                value.map((item, index) =>
                  typeof item === "object" ? (
                    <div key={index}>
                      {Object.keys(item).map((subKey) => (
                        <input
                          key={subKey}
                          type="text"
                          name={subKey}
                          placeholder={`Enter ${subKey}`}
                          value={item[subKey]}
                          onChange={(e) => handleChange(e, null, index, key)}
                        />
                      ))}
                      <button type="button" onClick={() => removeField(null, index, key)}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder={`Enter ${key}`}
                        value={item}
                        onChange={(e) => handleChange(e, null, index, key)}
                      />
                      <button type="button" onClick={() => removeField(null, index, key)}>
                        Remove
                      </button>
                    </div>
                  )
                )
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  value={value}
                  onChange={(e) => handleChange(e, null, null, "dynamicContent")}
                />
              )}
              {Array.isArray(value) && (
                <button type="button" onClick={() => addField(typeof value[0], key)}>
                  Add {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit">Send Email</button>
        </form>

        {/* Status Popup */}
        {popupVisible && (
          <div className={`popup ${status.type === "success" ? "success" : "error"}`}>
            <div>{status.message}</div>
          </div>
        )}
      </div>
      <br></br>
      <hr></hr>
      <div className="sticky-images">
          <Image
            src="/images/footer.JPG"
            alt="logo"
            width={500}
            height={250}
            layout="intrinsic"
            className="img-fluid"
          />
          <Image
            src="/images/footer.JPG"
            alt="logo"
            width={500}
            height={250}
            layout="intrinsic"
            className="img-fluid"
          />
        </div>
    </section>
  );
};

export default EmailForm;




// import { useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Image from 'next/image'


// const EmailForm = () => {
//   const [formData, setFormData] = useState({
//     email: [""],
//     name: [""],
//     subject: "",
//     dynamicContent: {
//       subjectHeading: "",
//       introParagraph: "",
//       firstImage: "",
//       aboutHeading: "",
//       aboutParagraph: "",
//       secondImage: "",
//       invitationHeading: "",
//       invitationParagraph: "",
//       detailsHeading: "",
//       detailsList: [""],
//       keyTopicsHeading: "",
//       keyTopicsList: [""],
//       keyTopicsImage: "",
//       masterClassHeading: "",
//       masterClassParagraph: "",
//       weAreInHeading: "",
//       weAreInParagraph: "",
//       nominationHeading: "",
//       nominationParagraph: "",
//       otherCostsHeading: "",
//       otherCostsList: [""],
//       paymentInfoHeading: "",
//       paymentInfoParagraph: "",
//       paymentDetails: [
//         {
//           type: "",
//           bankName: "",
//           intermediaryBank: "",
//           swiftCode: "",
//           routingNumber: "",
//           beneficiaryName: "",
//           beneficiaryAccount: "",
//         },
//       ],
//       thirdPartyPaymentInfo: "",
//       distanceLearningInfo: "",
//       endowmentInfo: "",
//       enrolNowInfo: "",
//       closingLine: "",
//       signatureImage: "",
//       SignName: "",
//       letterheadImage: "",
//       footerText: "",
//       footerImage: "",
//       viewInBrowserLink: "",
//       unsubscribeLink: "",
//     },
//   });

//   const [status, setStatus] = useState(null);

//   // Add a new field dynamically
//   const addField = (type, key = null) => {
//     setFormData((prev) => {
//       if (key) {
//         return {
//           ...prev,
//           dynamicContent: {
//             ...prev.dynamicContent,
//             [key]: [...prev.dynamicContent[key], type === "object" ? {} : ""],
//           },
//         };
//       }
//       return {
//         ...prev,
//         [type]: [...prev[type], ""],
//       };
//     });
//   };

//   // Remove a dynamic field
//   const removeField = (type, index, key = null) => {
//     setFormData((prev) => {
//       if (key) {
//         return {
//           ...prev,
//           dynamicContent: {
//             ...prev.dynamicContent,
//             [key]: prev.dynamicContent[key].filter((_, i) => i !== index),
//           },
//         };
//       }
//       return {
//         ...prev,
//         [type]: prev[type].filter((_, i) => i !== index),
//       };
//     });
//   };

//   // Handle form input changes
//   const handleChange = (e, type, index = null, key = null) => {
//     const { name, value } = e.target;

//     if (index !== null) {
//       if (key) {
//         setFormData((prev) => ({
//           ...prev,
//           dynamicContent: {
//             ...prev.dynamicContent,
//             [key]: prev.dynamicContent[key].map((item, i) =>
//               i === index ? (typeof item === "object" ? { ...item, [name]: value } : value) : item
//             ),
//           },
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [type]: prev[type].map((item, i) => (i === index ? value : item)),
//         }));
//       }
//     } else {
//       if (key) {
//         setFormData((prev) => ({
//           ...prev,
//           dynamicContent: {
//             ...prev.dynamicContent,
//             [name]: value,
//           },
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [type]: value,
//         }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("https://send-email-517z.onrender.com/send-invitation-email", formData);
//       setStatus({ type: "success", message: "Email sent successfully!" });
//     } catch (error) {
//       console.error(error);
//       setStatus({ type: "error", message: "Failed to send email." });
//     }
//   };

//   return (
//     <div>
//       <h1>London Graduate School Invitation Email</h1>
//       <Image
//         src="/images/logo.JPG"
//         alt="logo"
//         width={500}  
//         height={250} 
//         layout="intrinsic" 
//         className="img-fluid"
//       />

//       <form onSubmit={handleSubmit}>
//         {/* Email and Name Inputs */}
//         {["email", "name"].map((field) => (
//           <div key={field}>
//             <label>{field.charAt(0).toUpperCase() + field.slice(1)}s:</label>
//             {formData[field].map((item, index) => (
//               <div key={index}>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   placeholder={`Enter ${field}`}
//                   value={item}
//                   onChange={(e) => handleChange(e, field, index)}
//                   required
//                 />
//                 <button type="button" onClick={() => removeField(field, index)}>
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={() => addField(field)}>
//               Add {field.charAt(0).toUpperCase() + field.slice(1)}
//             </button>
//           </div>
//         ))}

//         {/* Subject */}
//         <div>
//           <label>Subject:</label>
//           <input
//             type="text"
//             name="subject"
//             placeholder="Enter subject"
//             value={formData.subject}
//             onChange={(e) => handleChange(e, "subject")}
//             required
//           />
//         </div>

//         {/* Dynamic Content */}
//         {Object.entries(formData.dynamicContent).map(([key, value]) => (
//           <div key={key}>
//             <label>{key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}:</label>
//             {Array.isArray(value) ? (
//               value.map((item, index) =>
//                 typeof item === "object" ? (
//                   <div key={index}>
//                     {Object.keys(item).map((subKey) => (
//                       <input
//                         key={subKey}
//                         type="text"
//                         name={subKey}
//                         placeholder={`Enter ${subKey}`}
//                         value={item[subKey]}
//                         onChange={(e) => handleChange(e, null, index, key)}
//                       />
//                     ))}
//                     <button type="button" onClick={() => removeField(null, index, key)}>
//                       Remove
//                     </button>
//                   </div>
//                 ) : (
//                   <div key={index}>
//                     <input
//                       type="text"
//                       placeholder={`Enter ${key}`}
//                       value={item}
//                       onChange={(e) => handleChange(e, null, index, key)}
//                     />
//                     <button type="button" onClick={() => removeField(null, index, key)}>
//                       Remove
//                     </button>
//                   </div>
//                 )
//               )
//             ) : (
//               <input
//                 type="text"
//                 name={key}
//                 placeholder={`Enter ${key}`}
//                 value={value}
//                 onChange={(e) => handleChange(e, null, null, "dynamicContent")}
//               />
//             )}
//             {Array.isArray(value) && (
//               <button type="button" onClick={() => addField(typeof value[0], key)}>
//                 Add {key.charAt(0).toUpperCase() + key.slice(1)}
//               </button>
//             )}
//           </div>
//         ))}

//         {/* Submit Button */}
//         <button type="submit">Send Email</button>
//       </form>

//       {/* Status */}
//       {status && (
//         <div style={{ color: status.type === "success" ? "green" : "red" }}>
//           {status.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailForm;

