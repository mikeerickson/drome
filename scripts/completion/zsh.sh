###-begin-drome-completion-###
if type compdef &>/dev/null; then
  _drome_completion () {
    local reply
    local si=$IFS

    IFS=$'\n' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" drome completion -- "${words[@]}"))
    IFS=$si

    _describe 'values' reply
  }
  compdef _drome_completion drome
fi
###-end-drome-completion-###