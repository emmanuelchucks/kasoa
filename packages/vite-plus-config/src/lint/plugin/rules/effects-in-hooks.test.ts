import { tsxRuleTester } from "../rule-tester.ts";
import { effectsInHooks } from "./effects-in-hooks.ts";

const react = 'import { useEffect, useLayoutEffect } from "react";';

tsxRuleTester.run("effects-in-hooks", effectsInHooks, {
  valid: [
    `${react}\nexport function useOnlineStatus() {\n  useEffect(() => subscribe(), []);\n}`,
    `${react}\nexport const useWindowWidth = () => {\n  useLayoutEffect(() => measure(), []);\n};`,
    'import * as React from "react";\nexport function useTitle(title) {\n  React.useEffect(() => { document.title = title; }, [title]);\n}',
    'import { useEffect } from "./effects";\nexport function Card() {\n  useEffect();\n  return <View />;\n}',
    `${react}\nexport function Card() {\n  useOnlineStatus();\n  return <View />;\n}`,
  ],
  invalid: [
    {
      code: `${react}\nexport function Card() {\n  useEffect(() => subscribe(), []);\n  return <View />;\n}`,
      errors: [{ messageId: "effect", data: { name: "useEffect" } }],
    },
    {
      code: `${react}\nexport const Card = () => {\n  useLayoutEffect(() => measure(), []);\n  return <View />;\n};`,
      errors: [{ messageId: "effect", data: { name: "useLayoutEffect" } }],
    },
    {
      code: 'import { useEffect as useMount } from "react";\nexport function Card() {\n  useMount(() => subscribe(), []);\n  return <View />;\n}',
      errors: [{ messageId: "effect", data: { name: "useEffect" } }],
    },
    {
      code: 'import React from "react";\nexport function Card() {\n  React.useInsertionEffect(() => insert(), []);\n  return <View />;\n}',
      errors: [{ messageId: "effect", data: { name: "useInsertionEffect" } }],
    },
    {
      code: `${react}\nexport default function () {\n  useEffect(() => subscribe(), []);\n  return <View />;\n}`,
      errors: [{ messageId: "effect" }],
    },
  ],
});
