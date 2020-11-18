import { HackerNewsApi } from "./HackerNewsApi";
import { NewYorkTimesApi } from "./NewYorkTimesApi";

export default {
  hackernews: new HackerNewsApi(),
  newyorktimes: new NewYorkTimesApi()
};
