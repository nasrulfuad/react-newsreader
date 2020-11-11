import { HackerNewsApi } from "./hackernews";
import { NewYorkTimesApi } from "./newyorktimes";

export default {
  hackernews: new HackerNewsApi(),
  newyorktimes: new NewYorkTimesApi()
};
