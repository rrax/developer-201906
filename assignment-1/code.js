import R from 'ramda';
import Task from 'data.task';

import { slist, plist, findPid } from 'lists';
import { findPid, safeHead, Unit, getOrElse, stringToInt } from 'functions';
import { Action, AsyncAction, toFSErrorAction, toFSAction, Actions } from 'actions';

export const filterBy = R.curry((id, filters) =>
  Action(Actions.Load, {})
    .andThen(AsyncAction(
      R.sequence(Task.of, filters.map(cata({
        Status: R.compose(R.map(R.pluck('id')), slist),
        Pid: findPid,
        Criteria: R.compose(R.map(R.pluck('id')), plist)
      })))
        .map(ids => R.reduce(R.intersection, R.head(ids), R.tail(ids)))
        .map(R.filter(R.compose(getOrElse(false), R.map(R.lte(5000)), stringToInt)))
        .map(sort)
        .bimap(toFSErrorAction(Actions.FilterFailure),
               toFSAction(Actions.Filter))))
    .chain(({ payload: ids }) =>
      R.ifElse(R.contains(id),
               R.always(Just(id)),
               safeHead)(ids).map(findById).getOrElse(Unit())));
