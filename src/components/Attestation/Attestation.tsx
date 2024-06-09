import { useEffect, useState } from "react";

const Attestation = ({ attestation }: any) => (
  <div>
    {attestation.map((item: any, index: number) => (
      <p key={index}>
        {
          <div>
            <strong>{item.name}:</strong> {item.value.value.toString()}
          </div>
        }
      </p>
    ))}
    <hr />
  </div>
);

export default Attestation;
