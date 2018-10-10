###-begin-drome-completion-###
function _drome_completion
  set cmd (commandline -o)
  set cursor (commandline -C)
  set words (node -pe "'$cmd'.split(' ').length")

  set completions (eval env DEBUG=\"" \"" COMP_CWORD=\""$words\"" COMP_LINE=\""$cmd \"" COMP_POINT=\""$cursor\"" drome completion -- $cmd)

  for completion in $completions
    echo -e $completion
  end
end

complete -f -d 'drome' -c drome -a "(eval _drome_completion)"
###-end-drome-completion-###