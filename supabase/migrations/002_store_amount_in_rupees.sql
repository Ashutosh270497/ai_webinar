alter table registrations
alter column amount set default 99;

update registrations
set amount = case
  when amount is null then 99
  when amount >= 100 then amount / 100
  else amount
end;
