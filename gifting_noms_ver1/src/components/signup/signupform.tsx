// "use client";

// import { signup } from "@/components/signup/actions";
// import { useActionState } from "react";

// export default function signupform() {
//   const [state, action, pending] = useActionState(signup);

//   return (
//     <div>
//       <form className="w-[300px] h-[auto] flex flex-col justify-between">
//         <input type="text" name="name" id="inp_text" />
//         {state?.errors?.name && <p>{state.errors.name}</p>}
//         <input type="email" name="email" id="inp_email" />
//         {state?.errors?.email && <p>{state.errors.email}</p>}
//         <input type="password" name="password" id="inp_password" />
//         {state?.errors?.password && <p>{state.errors.password}</p>}

//         <button disabled={pending}>
//           {pending ? "Submitting..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// }
