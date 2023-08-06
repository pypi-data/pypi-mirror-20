# coding=utf-8
"""
Mal Runtime environment with JIT Actions.
"""
from __future__ import print_function
from recordclass import recordclass

FLAGS = recordclass('RunnerFlags',
                    'halt div_by_zero out_of_bounds bad_operand')


def no_op(_):
    """
    Non-operation.
    Does nothing for when no jit is needed or found.
    :return: None
    """
    pass


class ActionRunner(object):
    """
    This is a runtime environment.
    It sets memory on instantiation and zeros the registers.
    """

    def __init__(self, actions):
        self.actions = actions
        self.memory = None
        self.flags = FLAGS(False, False, False, False)
        self.registers = [0 for _ in range(16)]
        self.program_counter = 0
        self.evaluate = {
            'MOVE': self._move,
            'MOVEI': self._movei,
            'LOAD': self._load,
            'STORE': self._store,
            'ADD': self._add,
            'INC': self._inc,
            'SUB': self._sub,
            'DEC': self._dec,
            'MUL': self._mul,
            'DIV': self._div,
            'BEQ': self._beq,
            'BLT': self._blt,
            'BGT': self._bgt,
            'BR': self._br,
            'END': self._end
        }

    def reset(self):
        """
        Resets the memory, registers and program counter.
        """
        self.memory = None
        self.flags = FLAGS(False, False, False, False)
        self.registers = [0 for _ in range(16)]
        self.program_counter = 0

    def run(self, program, memory):
        """
        Runs an instruction set on a loaded memory and cleared register
        :param program: Either the instruction list or text.
                        It will be parsed if it is text.
        :param memory: The memory contents on which to run the program.
        :return: Memory contents
        """
        self.memory = memory
        while not any([self.flags.halt, self.flags.div_by_zero,
                       self.flags.out_of_bounds, self.flags.bad_operand]):
            if self.program_counter > len(program):
                self.flags.out_of_bounds = True
            else:
                opcode, operands = program[self.program_counter]
                self.evaluate[opcode](operands)
                self.program_counter += 1

        if not any([self.flags.div_by_zero,
                    self.flags.out_of_bounds,
                    self.flags.bad_operand]):
            return self.memory
        else:
            return [self.flags.div_by_zero,
                    self.flags.out_of_bounds,
                    self.flags.bad_operand]

    def _move(self, ops):
        if ops[0].startswith('R') and ops[1].startswith('R'):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            self.actions.get('MOVE', no_op)([('REG', reg0), ('REG', reg1)])
            self.registers[reg1] = self.registers[reg0]
        else:
            self.flags.bad_operand = True

    def _movei(self, ops):
        if ops[0].startswith('V') and ops[1].startswith('R'):
            valbl0 = int(ops[0][1:])
            reg1 = int(ops[1][1:], 16)
            self.actions.get('MOVEI', no_op)([('VAL', valbl0), ('REG', reg1)])
            self.registers[reg1] = valbl0
        else:
            self.flags.bad_operand = True

    def _load(self, ops):
        if ops[0].startswith('R') and ops[1].startswith('R'):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            self.actions.get('LOAD', no_op)([('REG', reg0), ('REG', reg1)])
            self.registers[reg1] = self.memory[self.registers[reg0]]
        else:
            self.flags.bad_operand = True

    def _store(self, ops):
        if ops[0].startswith('R') and ops[1].startswith('R'):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            self.actions.get('STORE', no_op)([('REG', reg0), ('REG', reg1)])
            self.memory[self.registers[reg1]] = self.registers[reg0]
        else:
            self.flags.bad_operand = True

    def _add(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('R'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            reg2 = int(ops[2][1:], 16)
            self.actions.get('ADD', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('REG', reg2)])
            self.registers[reg2] = (self.registers[reg0]
                                    + self.registers[reg1]) % 64
        else:
            self.flags.bad_operand = True

    def _inc(self, ops):
        if ops[0].startswith('R'):
            reg0 = int(ops[0][1:])
            self.actions.get('REG', no_op)([('REG', reg0)])
            self.registers[reg0] += 1
        else:
            self.flags.bad_operand = True

    def _sub(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('R'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            reg2 = int(ops[2][1:], 16)
            self.actions.get('SUB', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('REG', reg2)])
            self.registers[reg2] = (self.registers[reg0]
                                    - self.registers[reg1]) % 64
        else:
            self.flags.bad_operand = True

    def _dec(self, ops):
        if ops[0].startswith('R'):
            reg0 = int(ops[0][1:])
            self.actions.get('REG', no_op)([('REG', reg0)])
            self.registers[reg0] -= 1
        else:
            self.flags.bad_operand = True

    def _mul(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('R'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            reg2 = int(ops[2][1:], 16)
            self.actions.get('MUL', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('REG', reg2)])
            self.registers[reg2] = (self.registers[reg0]
                                    * self.registers[reg1]) % 64
        else:
            self.flags.bad_operand = True

    def _div(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('R'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            reg2 = int(ops[2][1:], 16)
            if reg1 == 0:
                self.flags.div_by_zero = True
                return  # Don't do division if reg1 is 0.
            self.actions.get('ADD', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('REG', reg2)])
            self.registers[reg2] = (self.registers[reg0]
                                    + self.registers[reg1]) % 64
        else:
            self.flags.bad_operand = True

    def _bgt(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('L'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            lbl2 = int(ops[2][1:])
            self.actions.get('BGT', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('LINE', lbl2)])
            if self.registers[reg0] > self.registers[reg1]:
                self.program_counter = lbl2
        else:
            self.flags.bad_operand = True

    def _blt(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('L'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            lbl2 = int(ops[2][1:])
            self.actions.get('BGT', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('LINE', lbl2)])
            if self.registers[reg0] < self.registers[reg1]:
                self.program_counter = lbl2
        else:
            self.flags.bad_operand = True

    def _beq(self, ops):
        if all((ops[0].startswith('R'),
                ops[1].startswith('R'),
                ops[2].startswith('L'))):
            reg0 = int(ops[0][1:], 16)
            reg1 = int(ops[1][1:], 16)
            lbl2 = int(ops[2][1:])
            self.actions.get('BGT', no_op)([('REG', reg0),
                                            ('REG', reg1),
                                            ('LINE', lbl2)])
            if self.registers[reg0] == self.registers[reg1]:
                self.program_counter = lbl2
        else:
            self.flags.bad_operand = True

    def _br(self, ops):
        if ops[0].startswith('L'):
            lbl0 = int(ops[0][1:])
            self.actions.get('BR', no_op)([('LINE', lbl0)])
            self.program_counter = lbl0
        else:
            self.flags.bad_operand = True

    def _end(self, _):
        self.flags.halt = True
