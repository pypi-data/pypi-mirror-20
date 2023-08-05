from restclients.sws.v5.term import get_term_by_year_and_quarter
from restclients.sws.v5.term import get_current_term
from restclients.sws.v5.term import get_next_term
from restclients.sws.v5.term import get_previous_term
from restclients.sws.v5.term import get_term_before
from restclients.sws.v5.term import get_term_after
from restclients.sws.v5.term import get_term_by_date


def get_specific_term(year, quarter):
    """
    Rename the get_term_by_year_and_quarter to a short name.
    """
    return get_term_by_year_and_quarter(year, quarter.lower())


def get_next_autumn_term(term):
    """
    Return the Term object for the next autumn quarter
    in the same year as the given term
    """
    return get_specific_term(term.year, 'autumn')


def get_next_non_summer_term(term):
    """
    Return the Term object for the quarter after
    as the given term (skip the summer quarter)
    """
    next_term = get_term_after(term)
    if next_term.is_summer_quarter():
        return get_next_autumn_term(next_term)
    return next_term
