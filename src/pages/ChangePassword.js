import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { TextInput, Label, Button } from "flowbite-react";

const ChangePassword = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const { setOldPass, setNewPass, setConfNewPass } = state;

  const { handleChangePassword } = handleFunction;

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Ganti Password
      </h1>
      <div className="md:w-6/12 mt-6 mb-32">
        <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="old" value="Password Lama" />
            </div>
            <TextInput
              id="oldPass"
              type="password"
              required={true}
              min="8"
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="newPass" value="Password Baru" />
            </div>
            <TextInput
              id="newPass"
              name="newpass"
              type="password"
              min="8"
              required={true}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmNewPass" value="Password Baru" />
            </div>
            <TextInput
              id="confirmNewPass"
              name="confirmpass"
              type="password"
              min="8"
              required={true}
              onChange={(e) => {
                setConfNewPass(e.target.value);
              }}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
