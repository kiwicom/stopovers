import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import registerRequireContextHook from "babel-plugin-require-context-hook/register";

registerRequireContextHook();

configure({ adapter: new Adapter() });
