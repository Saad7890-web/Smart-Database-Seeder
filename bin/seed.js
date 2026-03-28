#!/usr/bin/env node

import { createProgram } from "../src/cli/program.js";
import { registerCommands } from "../src/cli/register-commands.js";

const program = createProgram();
registerCommands(program);

program.parse(process.argv);