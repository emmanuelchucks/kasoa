import { tsxRuleTester } from "../rule-tester.ts";
import { noMappedScrollview } from "./no-mapped-scrollview.ts";

const scrollView = 'import { ScrollView } from "react-native";';
const keyboard = 'import { KeyboardAwareScrollView } from "react-native-keyboard-controller";';

tsxRuleTester.run("no-mapped-scrollview", noMappedScrollview, {
  valid: [
    // A constant written in the code: call lengths.
    `${scrollView}\nconst lengths = [15, 30, 60] as const;\nexport const A = () => <ScrollView>{lengths.map((length) => <Text key={length}>{length}</Text>)}</ScrollView>;`,
    // A constant from a module the options name as holding constants.
    {
      code: `${scrollView}\nimport { reportReasons } from "@app/server/chat/contracts";\nexport const A = () => <ScrollView><Card>{reportReasons.map((reason) => <Text key={reason}>{reason}</Text>)}</Card></ScrollView>;`,
      options: [{ constantModules: ["/contracts$"] }],
    },
    // A .map that computes, not renders.
    `${scrollView}\nexport const A = ({ people }) => <ScrollView><Text>{people.map((p) => p.name).join(", ")}</Text></ScrollView>;`,
    // Held in a variable that's rendered outside any scroll view.
    `${scrollView}\nexport function A({ people }) {\n  const rows = people.map((p) => <Row key={p.id} />);\n  return <View>{rows}</View>;\n}`,
    // Not under a scroll view.
    "export const A = ({ people }) => <View>{people.map((p) => <Text key={p.id} />)}</View>;",
    // Not a library's ScrollView.
    'import { ScrollView } from "./scroll";\nexport const A = ({ people }) => <ScrollView>{people.map((p) => <Text key={p.id} />)}</ScrollView>;',
  ],
  invalid: [
    {
      code: `${scrollView}\nexport const A = ({ chats }) => <ScrollView>{chats.map((chat) => <Row key={chat.id} chat={chat} />)}</ScrollView>;`,
      errors: [{ messageId: "data", data: { view: "ScrollView" } }],
    },
    {
      code: `${keyboard}\nexport const A = ({ people }) => <KeyboardAwareScrollView>{people.map((p) => <Row key={p.id} />)}</KeyboardAwareScrollView>;`,
      errors: [{ messageId: "data", data: { view: "KeyboardAwareScrollView" } }],
    },
    {
      // Nested a level down, as members in a details section.
      code: `${scrollView}\nexport const A = ({ people }) => <ScrollView><Section>{people.map((p) => <Row key={p.id} />)}</Section></ScrollView>;`,
      errors: [{ messageId: "data" }],
    },
    {
      // In a component of this file that the ScrollView renders.
      code: `${scrollView}\nfunction Plan({ items }) { return items.map((item) => <Row key={item.id} />); }\nexport const A = ({ items }) => <ScrollView><Plan items={items} /></ScrollView>;`,
      errors: [{ messageId: "data" }],
    },
    {
      // Held in a local variable, then rendered in the ScrollView.
      code: `${scrollView}\nexport function A({ people }) {\n  const rows = people.map((p) => <Row key={p.id} />);\n  return <ScrollView>{rows}</ScrollView>;\n}`,
      errors: [{ messageId: "data" }],
    },
    {
      // A ScrollView inside a ScrollView: still one report.
      code: `${scrollView}\nexport const A = ({ tabs }) => <ScrollView><ScrollView horizontal>{tabs.map((tab) => <Chip key={tab} />)}</ScrollView></ScrollView>;`,
      errors: [{ messageId: "data" }],
    },
    {
      // A constant, but spread together with data.
      code: `${scrollView}\nconst everyone = [{ id: "all" }];\nexport const A = ({ people }) => <ScrollView>{[...everyone, ...people].map((p) => <Row key={p.id} />)}</ScrollView>;`,
      errors: [{ messageId: "data" }],
    },
    {
      // Declared in the component: rebuilt on every render from whatever it reads.
      code: `${scrollView}\nexport function A() {\n  const tabs = useTabs();\n  return <ScrollView horizontal>{tabs.map((tab) => <Chip key={tab} />)}</ScrollView>;\n}`,
      errors: [{ messageId: "data" }],
    },
    {
      // An import from a module the options don't name isn't known to be a constant.
      code: `${scrollView}\nimport { reasons } from "./reasons";\nexport const A = () => <ScrollView>{reasons.map((r) => <Text key={r} />)}</ScrollView>;`,
      errors: [{ messageId: "data" }],
    },
    {
      code: `import { ScrollView as Scroll } from "react-native";\nlet calls = [];\nexport const A = () => <Scroll>{calls.map((c) => <Row key={c.id} />)}</Scroll>;`,
      errors: [{ messageId: "data" }],
    },
  ],
});
