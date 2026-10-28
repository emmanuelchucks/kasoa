import { tsxRuleTester } from "../rule-tester.ts";
import { legendListOnly } from "./legend-list-only.ts";

tsxRuleTester.run("legend-list-only", legendListOnly, {
  valid: [
    'import { AnimatedLegendList } from "@legendapp/list/reanimated";\nexport const A = ({ rows }) => <AnimatedLegendList data={rows} />;',
    'import Animated from "react-native-reanimated";\nexport const A = () => <Animated.View />;',
    'import { ScrollView } from "react-native";\nexport const A = () => <ScrollView />;',
    'import * as Lists from "./lists";\nexport const A = () => <Lists.FlatList />;',
  ],
  invalid: [
    {
      code: 'import { FlatList } from "react-native";\nexport const A = ({ rows }) => <FlatList data={rows} />;',
      errors: [{ messageId: "engine" }],
    },
    {
      code: 'import { SectionList as Sections } from "react-native";\nexport const A = ({ all }) => <Sections sections={all} />;',
      errors: [{ messageId: "engine" }],
    },
    {
      code: 'import { FlatList } from "react-native-gesture-handler";\nexport const A = ({ rows }) => <FlatList data={rows} />;',
      errors: [{ messageId: "engine" }],
    },
    {
      code: 'import { Animated } from "react-native";\nexport const A = ({ rows }) => <Animated.FlatList data={rows} />;',
      errors: [{ messageId: "engine" }],
    },
    {
      code: 'import Animated from "react-native-reanimated";\nexport const A = ({ rows }) => <Animated.FlatList data={rows} />;',
      errors: [{ messageId: "engine" }],
    },
    {
      code: 'import Animated from "react-native-reanimated";\nexport const List = Animated.FlatList;',
      errors: [{ messageId: "engine" }],
    },
  ],
});
