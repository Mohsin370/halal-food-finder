"use client";

import * as React from "react";
import { Button, Divider, Form, Input } from "@heroui/react";

export default function RestaurantForm() {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
    //setSubmitted(data);
  };

  return (
    <Form className="w-full" onSubmit={onSubmit}>
      <div className="flex flex-wrap gap-10">
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Name"
          labelPlacement="outside"
          name="email"
          placeholder="Restaurant Name"
          type="text"
          value={name}
          onValueChange={setName}
          fullWidth={false}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Name"
          labelPlacement="outside"
          name="email"
          placeholder="Restaurant Name"
          type="text"
          value={name}
          onValueChange={setName}
          fullWidth={false}

        />
      </div>
      <div className="flex flex-wrap gap-5 my-10">
        <Input
          isRequired
          errorMessage="Please enter a valid address"
          label="Address"
          labelPlacement="outside"
          name="address"
          placeholder="Restaurant Adress"
          type="text"
          value={address}
          onValueChange={setAddress}
          fullWidth={false}
        />
       
        
       
       
      </div>
      <Button type="submit" variant="bordered">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
