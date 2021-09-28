import { sleep, group, check } from "k6";
import http from "k6/http";

import { FormData } from "https://jslib.k6.io/formdata/0.0.1/index.js";

export const options = {
  ext: { loadimpact: { distribution: {} } },
  stages: [
    { target: 5, duration: "30s" },
    { target: 10, duration: "45s" },
    { target: 30, duration: "1m" },
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
    "page_1 - https://automationteststore.com/index.php?rt=account/login",
    function () {
      formData = new FormData();

      formData.append("loginname", {
        data: "AshtonScalac",
        content_type: "text/plain",
      });
      formData.append("password", {
        data: "test1234",
        content_type: "text/plain",
      });

      response = http.post(
        "https://automationteststore.com/index.php?rt=account/login",
        formData.body()
      );
      check(response, {
        "is status 200": (r) => r.status === 200,
      });
    }
  );
  sleep(1);
}
