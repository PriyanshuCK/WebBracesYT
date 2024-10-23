import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import {
  Code,
  CodeProps,
  LezerHighlighter,
  withDefaults,
} from "@motion-canvas/2d";
import { parser as html } from "@lezer/html";
import { parser as css } from "@lezer/css";
import { parser as js } from "@lezer/javascript";

const syntax = {
  boolean: "#ff9cac",
  class: "#FFCB6B",
  classMember: "#f07178",
  comment: "#546E7A",
  cssClass: "#FFCB6B",
  cssId: "#F78C6C",
  cssProperties: "#B2CCD6",
  cssTag: "#FFCB6B",
  function: "#82AAFF",
  functionCall: "#82AAFF",
  identifier: "#f07178",
  keyword: "#C792EA",
  string: "#C3E88D",
  content: "#EEFFFF",
  type: "#FFCB6B",
  punctuation: "#89DDFF",
  braces: "#FFCB6B",
  otherKeyword: "#F78C6C",
  variable: "#EEFFFF",
  number: "#F78C6C",
};

export const Style = HighlightStyle.define([
  {
    tag: [tags.modifier, tags.definitionKeyword, tags.moduleKeyword , tags.attributeName],
    color: syntax.keyword,
  },
  {
    tag: [
      tags.keyword,
      tags.controlKeyword,
      tags.operatorKeyword,
      tags.angleBracket,
    ],
    color: syntax.punctuation,
  },
  {
    tag: [tags.name, tags.deleted, tags.character, tags.macroName],
    color: syntax.function,
  },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: syntax.function,
  },
  {
    tag: tags.propertyName,
    color: syntax.variable,
  },
  {
    tag: [tags.definition(tags.propertyName), tags.definition(tags.typeName)],
    color: syntax.function,
  },
  { tag: tags.typeName, color: syntax.type },
  { tag: [tags.number, tags.integer, tags.float], color: syntax.number },
  { tag: tags.string, color: syntax.string },
  { tag: tags.regexp, color: syntax.string },
  { tag: [tags.content,tags.escape], color: syntax.content },
  { tag: [tags.bool, tags.null], color: syntax.boolean },
  {
    tag: [tags.className],
    color: syntax.class,
  },
  {
    tag: [tags.comment, tags.lineComment, tags.blockComment, tags.docComment],
    color: syntax.comment,
  },
  {
    tag: [tags.bracket, tags.squareBracket, tags.paren, tags.brace],
    color: syntax.braces,
  },
  {
    tag: [
      tags.separator,
      tags.operator,
      tags.arithmeticOperator,
      tags.logicOperator,
      tags.bitwiseOperator,
      tags.compareOperator,
      tags.updateOperator,
    ],
    color: syntax.punctuation,
  },
  { tag: tags.variableName, color: syntax.variable },
  { tag: [tags.atom, tags.unit], color: syntax.otherKeyword },
  {
    tag: [
      tags.heading,
      tags.heading1,
      tags.heading2,
      tags.heading3,
      tags.heading4,
      tags.heading5,
      tags.heading6,
    ],
    color: syntax.identifier,
  },
  { tag: [tags.link, tags.url], color: syntax.string },
  {
    tag: [tags.emphasis, tags.strong, tags.tagName],
    color: syntax.classMember,
  },
  { tag: tags.strikethrough, color: syntax.comment },
  { tag: tags.inserted, color: syntax.string },
  { tag: tags.changed, color: syntax.otherKeyword },
  { tag: tags.invalid, color: syntax.boolean },
  {
    tag: [
      tags.meta,
      tags.documentMeta,
      tags.annotation,
      tags.processingInstruction,
    ],
    color: syntax.comment,
  },
]);

const Defaults: CodeProps = {
  fill: syntax.content,
  fontFamily: "'Cascadia Code', Consolas, 'Courier New', Monospace",
  lineHeight: "150%",
  fontSize: 28,
};

export const PlainCode = withDefaults(Code, Defaults);

export const HTMLCode = withDefaults(Code, {
  highlighter: new LezerHighlighter(html, Style),
  ...Defaults,
});
export const CSSCode = withDefaults(Code, {
  highlighter: new LezerHighlighter(css, Style),
  ...Defaults,
});
export const JSCode = withDefaults(Code, {
  highlighter: new LezerHighlighter(js, Style),
  ...Defaults,
});
