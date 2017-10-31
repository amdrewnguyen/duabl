class Api::TeamsController < ApplicationController
  before_action :require_logged_in, only: %i(index show create update destroy)

  def index
    @teams = current_user.teams
  end

  def show
    @team = current_user.teams.find(params[:id])
  end

  def create
    @team = Task.new(team_params)
    @team.owner_id = current_user.id

    if current_user.teams.append(@team)
      render "api/teams/show"
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def update
    @team = current_user.teams_led.find(params[:id])
    if @team.update(team_params)
      render "api/teams/show"
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  def destroy
    @team = current_user.teams_led.find(params[:id])
    if @team.destroy
      render "api/teams/show"
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  private

  def team_params
    params.require(:team).permit(:name)
  end
end
