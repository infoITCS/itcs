// import React from 'react';
// import { useForm, ValidationError } from '@formspree/react';
// import "./Csection3.scss";
// import CSection3img from "./../../../assets/images/contact-section3.webp";

// const Csection3 = () => {
//   const [state, handleSubmit] = useForm("xovjnypa");

//   if (state.succeeded) {
//     return <p>Thanks for reaching out! We’ll get back to you soon.</p>;
//   }

//   return (
//     <>
//       <div className="contact-container">
//         <div className="contact-grid">
//           {/* Left Section: Form */}
//           <div className="contact-form">
//             <h2>Need Assistance?</h2>
//             <h3>Let’s Connect!</h3>
//             <p>Have some suggestions or just want to say hi? Contact us:</p>
//             <form onSubmit={handleSubmit} className="form-fields">
//               <div>
//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   placeholder="Name *"
//                   required
//                 />
//                 <ValidationError
//                   prefix="Name"
//                   field="name"
//                   errors={state.errors}
//                 />
//               </div>
//               <div>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="Email *"
//                   required
//                 />
//                 <ValidationError
//                   prefix="Email"
//                   field="email"
//                   errors={state.errors}
//                 />
//               </div>
//               <div>
//                 <input
//                   id="subject"
//                   type="text"
//                   name="subject"
//                   placeholder="Subject"
//                 />
//                 <ValidationError
//                   prefix="Subject"
//                   field="subject"
//                   errors={state.errors}
//                 />
//               </div>
//               <div>
//                 <textarea
//                   id="message"
//                   name="message"
//                   placeholder="Message..."
//                   required
//                 />
//                 <ValidationError
//                   prefix="Message"
//                   field="message"
//                   errors={state.errors}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="submit-button"
//                 disabled={state.submitting}
//               >
//                 Send a Message
//               </button>
//             </form>
//           </div>

//           {/* Right Section: Image */}
//           <div className="contact-image">
//             <img src={CSection3img} alt="Building" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Csection3;
//myzkdqdn

import React, { useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "./Csection3.scss";
import CSection3img from "./../../../assets/images/contact-section3.webp";

const Csection3 = () => {
  const [state, handleSubmit] = useForm("myzkdqdn");
  const formRef = useRef(null); // Reference to the form element

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default behavior
    await handleSubmit(event); // Submit the form to Formspree
    if (state.succeeded) {
      formRef.current.reset(); // Clear the form fields
    }
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Section: Form */}
          <div className="contact-form">
            <h2>Need Assistance?</h2>
            <h3>Let’s Connect!</h3>
            <p>Have some suggestions or just want to say hi? Contact us:</p>
            <form
              ref={formRef} // Attach the reference to the form
              onSubmit={handleFormSubmit} // Use the custom submit handler
              className="form-fields"
            >
              <div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name *"
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message..."
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={state.submitting}
              >
                Send a Message
              </button>
            </form>

            {/* Show success message below the form */}
            {state.succeeded && (
              <p className="success-message">
                Thank you for your message. It has been sent.
              </p>
            )}
          </div>

          {/* Right Section: Image */}
          <div className="contact-image">
            <img src={CSection3img} alt="Building" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Csection3;


