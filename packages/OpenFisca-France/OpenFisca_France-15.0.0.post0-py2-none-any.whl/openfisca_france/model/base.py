# -*- coding: utf-8 -*-

from datetime import date

from openfisca_core.columns import (AgeCol, BoolCol, DateCol, EnumCol, FixedStrCol, FloatCol, IntCol,
    PeriodSizeIndependentIntCol, StrCol)
from openfisca_core.enumerations import Enum
from openfisca_core.formulas import (ADD, calculate_output_add, calculate_output_divide,
    dated_function, DIVIDE, missing_value, set_input_dispatch_by_period, set_input_divide_by_period)
from openfisca_core.variables import DatedVariable, Variable
from openfisca_core.base_functions import (
    requested_period_added_value,
    requested_period_default_value,
    requested_period_last_or_next_value,
    requested_period_last_value,
    )
from openfisca_core.formula_helpers import apply_thresholds, switch
from openfisca_core.periods import MONTH, YEAR, ETERNITY

from openfisca_france.entities import Famille, FoyerFiscal, Individu, Menage


__all__ = [
    'ADD',
    'AgeCol',
    'apply_thresholds',
    'BoolCol',
    'calculate_output_add',
    'calculate_output_divide',
    'CATEGORIE_SALARIE',
    'CHEF',
    'CONJ',
    'CREF',
    'date',
    'DateCol',
    'dated_function',
    'DatedVariable',
    'DIVIDE',
    'ENFS',
    'Enum',
    'EnumCol',
    'Famille',
    'FixedStrCol',
    'FloatCol',
    'FoyerFiscal',
    'Individu',
    'IntCol',
    'Menage',
    'missing_value',
    'PAC1',
    'PAC2',
    'PAC3',
    'PART',
    'PeriodSizeIndependentIntCol',
    'PREF',
    'QUIFAM',
    'QUIFOY',
    'QUIMEN',
    'requested_period_added_value',
    'requested_period_default_value',
    'requested_period_last_or_next_value',
    'requested_period_last_value',
    'set_input_dispatch_by_period',
    'set_input_divide_by_period',
    'StrCol',
    'switch',
    'TAUX_DE_PRIME',
    'Variable',
    'VOUS',
    'MONTH',
    'YEAR',
    'ETERNITY',
    ]

CATEGORIE_SALARIE = Enum([
    'prive_non_cadre',
    'prive_cadre',
    'public_titulaire_etat',
    'public_titulaire_militaire',
    'public_titulaire_territoriale',
    'public_titulaire_hospitaliere',
    'public_non_titulaire',
    'non_pertinent',
    ])

TAUX_DE_PRIME = 1 / 4  # primes_fonction_publique (hors suppl. familial et indemnité de résidence)/rémunération brute

# Legacy roles. To be removed when they are not used by formulas anymore.
QUIFAM = Enum(['chef', 'part', 'enf1', 'enf2', 'enf3', 'enf4', 'enf5', 'enf6', 'enf7', 'enf8', 'enf9'])
QUIFOY = Enum(['vous', 'conj', 'pac1', 'pac2', 'pac3', 'pac4', 'pac5', 'pac6', 'pac7', 'pac8', 'pac9'])
QUIMEN = Enum(['pref', 'cref', 'enf1', 'enf2', 'enf3', 'enf4', 'enf5', 'enf6', 'enf7', 'enf8', 'enf9'])

CHEF = QUIFAM['chef']
CONJ = QUIFOY['conj']
CREF = QUIMEN['cref']
ENFS = [
    QUIFAM['enf1'], QUIFAM['enf2'], QUIFAM['enf3'], QUIFAM['enf4'], QUIFAM['enf5'], QUIFAM['enf6'], QUIFAM['enf7'],
    QUIFAM['enf8'], QUIFAM['enf9'],
    ]
PAC1 = QUIFOY['pac1']
PAC2 = QUIFOY['pac2']
PAC3 = QUIFOY['pac3']
PART = QUIFAM['part']
PREF = QUIMEN['pref']
VOUS = QUIFOY['vous']
