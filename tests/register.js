import { sleep, group, check } from "k6";
import http from "k6/http";

import { FormData } from "https://jslib.k6.io/formdata/0.0.1/index.js";

export const options = {
  ext: { loadimpact: { distribution: {} } },
  stages: [
    { target: 20, duration: "30s" },
    { target: 30, duration: "1m" },
    { target: 50, duration: "1m30s" },
  ],
  thresholds: {
    http_req_duration: ["max<50000"],
    http_reqs: ["count<200000"],
    http_req_failed: ["rate<50"],
    data_received: ["count<500000000"],
  },
};

export default function main() {
  let formData, response;

  group(
    "page_1 - https://automationteststore.com/index.php?rt=account/create",
    function () {
      formData = new FormData();
    }
  );
  formData.append("firstname", {
    data: "dariusz",
    content_type: "text/plain",
  });
  formData.append("lastname", {
    data: "testowy",
    content_type: "text/plain",
  });
  formData.append("email", {
    data: "darektestowy@gmail.com",
    content_type: "text/plain",
  });
  formData.append("address_1", {
    data: "lodowa",
    content_type: "text/plain",
  });
  formData.append("city", { data: "łódź", content_type: "text/plain" });
  formData.append("zone_id", { data: "2636", content_type: "text/plain" });
  formData.append("postcode", {
    data: "93-232",
    content_type: "text/plain",
  });
  formData.append("country_id", {
    data: "170",
    content_type: "text/plain",
  });
  formData.append("loginname", {
    data: "darektestowy",
    content_type: "text/plain",
  });
  formData.append("password", {
    data: "test1234",
    content_type: "text/plain",
  });
  formData.append("confirm", {
    data: "test1234",
    content_type: "text/plain",
  });
  formData.append("newsletter", { data: "0", content_type: "text/plain" });
  formData.append("agree", { data: "1", content_type: "text/plain" });

  response = http.post(
    "https://automationteststore.com/index.php?rt=account/create",
    formData.body()
  );
  check(response, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(0.6);

  response = http.get(
    "https://s3-eu-west-1.amazonaws.com/shoptimally-ire/dist/neowize/abantecart/nwa.js"
  );
  check(response, {
    "is status 200": (r) => r.status === 200,
  });

  response = http.get(
    "https://s3-eu-west-1.amazonaws.com/shoptimally-ire/dist/neowize/abantecart/abante.js"
  );
  check(response, {
    "is status 200": (r) => r.status === 200,
  });
}
