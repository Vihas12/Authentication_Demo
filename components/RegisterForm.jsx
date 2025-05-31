"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DropdownList from "./DropdownList";
import { set } from "mongoose";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [previousloan, setPreviousloan] = useState("");
  const [martialStatus, setMartialStatus] = useState("");
  const [numberOfDependents, setNumberOfDependents] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !residenceType ||
      !monthlyIncome ||
      !previousloan ||
      !martialStatus ||
      !numberOfDependents ||
      !city ||
      !state ||
      !password
    ) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const resUser = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUser.json();

      if (user) {
        setError("User already exists with this email");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          residenceType,
          monthlyIncome,
          previousloan,
          martialStatus,
          numberOfDependents,
          city,
          state,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed");
      }
    } catch (err) {
      setError("Error occurred while registering user");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow--xl p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-2xl font-extrabold my-4">Register</h1>

        <form onSubmit={handelSubmit}>
          <div className="flex flex-col mb-3 gap-3 lg:grid grid-cols-2">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setPhone(value);
                }
                }}
              type="phone"
              placeholder="Phone"
              maxLength={10}
            />
            <DropdownList
              label="Residence Type"
              items={["Owner", "Tenant"]}
              renderItem={(item) => item}
              onSelect={(item) => setResidenceType(item)}
            />
            <input
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                setMonthlyIncome(value);
                }
              }}
              type="number"
              placeholder="Monthly income"
              min="0"
            />
            <DropdownList
              label="Previous loan"
              items={["Yes", "No"]}
              renderItem={(item) => item}
              onSelect={(item) => setPreviousloan(item)}
            />
            <DropdownList
              label="Martial Status"
              items={["Single", "Married", "Divorced"]}
              renderItem={(item) => item}
              onSelect={(item) => setMartialStatus(item)}
            />
            <input
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                setNumberOfDependents(value);
                }
              }}
              type="number"
              placeholder="Number of dependents"
              min="0"
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City"
            />
            <input
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="State"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer md:w-full">
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <Link href={"/"} className="mt-3 text-sm text-right">
              Already have an account?{" "}
              <span className="text-blue-500 underline hover:text-blue-600">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
