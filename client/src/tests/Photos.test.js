import { render, screen } from "@testing-library/react";
import Photos from "../components/Photos/Photos.js";
import axios from "axios";
import API from "../config";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

test("make get request", async () => {
  const title = Photos();
  expect(title);
});
